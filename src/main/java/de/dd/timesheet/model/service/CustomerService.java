package de.dd.timesheet.model.service;

import de.dd.timesheet.model.Customer;
import de.dd.timesheet.repository.CustomerRepository;
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
@Path("/timesheet/customers")
@Consumes("application/json")
@Produces("application/json")
public class CustomerService {

    @Inject
    private CustomerRepository repository;

    @GET
    @Path("load/{id}")
    public Customer findCustomer(@PathParam("id") Integer id) {
        return repository.findById(id);
    }

    @GET
    public List<Customer> readAllCustomers() {
        return repository.getAll();
    }

    @POST
    public Customer saveCustomer(Customer customer) {
        return repository.merge(customer);
    }
}
