package de.dd.timesheet.repository;

import de.dd.timesheet.model.Project;
import java.util.List;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;

@Stateless
@TransactionAttribute(TransactionAttributeType.REQUIRED)
public class ProjectRepository extends BasicRepository<Project> {

    public ProjectRepository() {
        super(Project.class);
    }

    @Override
    public List<Project> getAll() {
        return super.getAll(); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Project merge(Project entity) {
        return super.merge(entity); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Project findById(Integer id) {
        return super.findById(id); //To change body of generated methods, choose Tools | Templates.
    }
    
    

}
