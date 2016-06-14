package de.dd.timesheet.model.service;

import de.dd.timesheet.model.Project;
import de.dd.timesheet.repository.ProjectRepository;
import java.util.List;
import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

@Named
@Path("/timesheet/projects")
@Consumes("application/json")
@Produces("application/json")
public class ProjectService {

    @Inject
    private ProjectRepository repository;

    @GET
    @Path("load/{id}")
    public Project findProject(@PathParam("id") Integer id) {
        return repository.findById(id);
    }

    @GET
    public List<Project> readAllProjects() {
        return repository.getAll();
    }
    
    @POST
    public Project saveProject(Project project){
        return repository.merge(project);
    }
}
