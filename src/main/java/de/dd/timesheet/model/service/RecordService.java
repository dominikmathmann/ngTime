package de.dd.timesheet.model.service;

import de.dd.timesheet.model.Record;
import de.dd.timesheet.model.dto.SingleValue;
import de.dd.timesheet.model.dto.SummaryDayDTO;
import de.dd.timesheet.model.dto.SummaryProjectDayDTO;
import de.dd.timesheet.repository.RecordRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

@Named
@Path("/timesheet/records")
@Consumes("application/json")
@Produces("application/json")
public class RecordService {

    
    @Inject
    RecordRepository recordRepository;

    private static final SimpleDateFormat DATEFORMAT = new SimpleDateFormat("dd.MM.yyyy");

    @GET
    @Produces("application/json")
    public List<Record> getTimeForProjects(@DefaultValue("") @QueryParam("project") String project,
            @DefaultValue("01.01.1970") @QueryParam("from") String from,
            @DefaultValue("01.01.9999") @QueryParam("to") String to,
            @DefaultValue("-1") @QueryParam("max") Integer max) throws ParseException {

        Date fromd = from == null ? new Date(0) : DATEFORMAT.parse(from);
        Date tod = to == null ? new Date(Long.MAX_VALUE) : DATEFORMAT.parse(to);
        return recordRepository.getByFilter(project, fromd, tod, max);
    }

    @GET
    @Produces("application/json")
    @Path("sum")
    public SummaryDayDTO getSumTime(@DefaultValue("01.01.1970") @QueryParam("from") String from,
            @DefaultValue("01.01.9999") @QueryParam("to") String to) throws ParseException {

        Date fromd = from == null ? new Date(0) : DATEFORMAT.parse(from);
        Date tod = to == null ? new Date(Long.MAX_VALUE) : DATEFORMAT.parse(to);
        Long total = recordRepository.getTotal(fromd, tod);
        
        SummaryDayDTO dto=new SummaryDayDTO(new Date());
        dto.setSum(total);
        
        return dto;
    }

    @GET
    @Path("summary")
    @Produces("application/json")
    public List<SummaryDayDTO> getSummary(@QueryParam("project") String project,
            @QueryParam("from") String from, @QueryParam("to") String to) throws ParseException {

        Date fromd = DATEFORMAT.parse(from);
        Date tod = DATEFORMAT.parse(to);
        List<Record> records = recordRepository.getByFilter(project, fromd, tod, -1);

        List<SummaryDayDTO> daySummary;
        List<SummaryProjectDayDTO> projectDaySummary;

        // Build Day-Entries
        daySummary = records.stream()
                .map(record -> clearTimeInformation(record.getStartTime()))
                .distinct()
                .map(date -> new SummaryDayDTO(date))
                .collect(Collectors.toList());

        // Group Day Entries
        Map<Date, List<Record>> dayRecordsMap = records.stream()
                .collect(Collectors.groupingBy(recordentry -> clearTimeInformation(recordentry.getStartTime())));

        dayRecordsMap
                // Group Day Entries by Project
                .forEach((mapDate, mapEntries) -> {
                    Map<String, List<Record>> dayEntriesByProject = mapEntries.stream().collect(Collectors.groupingBy(dayRecord -> dayRecord.getProject().getCustomer().getName()+", "+ dayRecord.getProject().getName()));
                    dayEntriesByProject.forEach((pProject, pEntries) -> {
                        // create Summary Object for every day and project
                        SummaryProjectDayDTO pdto = new SummaryProjectDayDTO(pProject, mapDate);
                        pEntries.forEach(precord -> {
                            pdto.addTask(precord.getDescription());
                            pdto.addTime(precord.getEndTime().getTime() - precord.getStartTime().getTime());
                        });

                        SummaryDayDTO dayEntry = daySummary.stream().filter(entry -> entry.getDate().equals(mapDate)).findFirst().get();
                        dayEntry.addTime(pdto.getTime());
                        dayEntry.getEntries().add(pdto);
                    });
                });

        return daySummary;
    }

    private Date clearTimeInformation(Date date) {
        GregorianCalendar gc = new GregorianCalendar();
        gc.setTime(date);
        gc.set(Calendar.HOUR_OF_DAY, 0);
        gc.set(Calendar.MINUTE, 0);
        gc.set(Calendar.SECOND, 0);
        gc.set(Calendar.MILLISECOND, 0);
        return gc.getTime();
    }

    @POST
    public Record addRecord(Record record) {
        return this.recordRepository.merge(record);
    }

    @GET
    @Path("load/{id}")
    public Record getRecord(@PathParam("id") Integer id) {
        return this.recordRepository.findById(id);
    }

    @GET
    @Path("last")
    public Record getLastRecord() {
        return this.recordRepository.getAll("id", true, 1, 0).get(0);
    }

    @GET
    @Produces("application/json")
    @Path("time")
    public SingleValue<Long> getTotalTime(@DefaultValue("01.01.1970") @QueryParam("from") String from,
            @DefaultValue("01.01.9999") @QueryParam("to") String to) throws ParseException {

        Date fromd = from == null ? new Date(0) : DATEFORMAT.parse(from);
        Date tod = to == null ? new Date(Long.MAX_VALUE) : DATEFORMAT.parse(to);
        List<Record> records = recordRepository.getByFilter(null, fromd, tod, -1);

        Long sum = records.stream()
                .mapToLong(e -> e.getEndTime().getTime() - e.getStartTime().getTime())
                .sum();

        return new SingleValue<>(sum);
    }
}
