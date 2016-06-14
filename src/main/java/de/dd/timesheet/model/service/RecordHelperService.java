package de.dd.timesheet.model.service;

import de.dd.timesheet.repository.RecordRepository;
import java.util.List;
import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

@Named
@Path("/timesheet/helper")
@Consumes("application/json")
@Produces("application/json")
public class RecordHelperService {

    @Inject
    RecordRepository recordRepository;

    @GET
    @Path("projects")
    public List<String> getProjects() {
        return recordRepository.getProjects();
    }

    @GET
    @Path("tasks")
    public List<String> getProjectTasks(@QueryParam("project") @DefaultValue("") String project) {
        return recordRepository.getProjectTasks(project);
    }

}
