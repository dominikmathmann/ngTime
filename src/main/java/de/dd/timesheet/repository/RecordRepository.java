package de.dd.timesheet.repository;

import de.dd.timesheet.model.Record;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.Query;
import javax.persistence.TemporalType;
import javax.persistence.TypedQuery;

/**
 *
 * @author Mathmann
 */
@Stateless
@TransactionAttribute(TransactionAttributeType.REQUIRED)
public class RecordRepository extends BasicRepository<Record> {

    public RecordRepository() {
        super(Record.class);
    }

    public List<Record> getByFilter(String project, Date from, Date to, Integer max) {
        StringBuffer buffer = new StringBuffer();
        buffer.append("select r from Record r left join r.project.customer c where r.startTime>:from and r.startTime<:to");

        if (project != null && !project.isEmpty()) {
            buffer.append(" and c.name like (:project)");
        }

        buffer.append(" order by r.startTime desc");

        TypedQuery<Record> query = getEntityManager().createQuery(buffer.toString(), Record.class);
        query.setParameter("from", from);
        query.setParameter("to", to);

        if (project != null && !project.isEmpty()) {
            query.setParameter("project", "%" + project + "%");
        }

        if (max != -1) {
            query.setMaxResults(max);
        }

        return query.getResultList();
    }

    @Override
    public List<Record> getAll(String sortAttribut, boolean descending, int max, int start) {
        return super.getAll(sortAttribut, descending, max, start);
    }

    @Override
    public List<Record> getAll() {
        return super.getAll("startTime", true);
    }

    @Override
    public Record merge(Record entity) {
        return super.merge(entity);
    }

    @Override
    public Record findById(Integer id) {
        return super.findById(id);
    }

    public List<String> getProjects() {
        String jpql = "select DISTINCT(r.project) from Record r";

        return super.getEntityManager().createQuery(jpql, String.class).getResultList();
    }

    public List<String> getProjectTasks(String project) {
        String jpql = "select DISTINCT(r.description) from Record r where r.project=:project";

        TypedQuery<String> query = super.getEntityManager().createQuery(jpql, String.class);
        query.setParameter("project", project);
        return query.getResultList();
    }

    public Long getTotal(Date from, Date to) {
        String sql="SELECT sum(TIMESTAMPDIFF(SECOND, startTime,endTime)) FROM DDTS_RECORD where startTime> ? and endTime < ?;";
        
        Query query = getEntityManager().createNativeQuery(sql);
        query.setParameter(1, from, TemporalType.TIMESTAMP);
        query.setParameter(2, to, TemporalType.TIMESTAMP);
        
        Object singleResult = query.getSingleResult();
        if (singleResult!=null)
        {
            return ((BigDecimal)singleResult).longValue();
        }
        
        return 0L;
    }
}
