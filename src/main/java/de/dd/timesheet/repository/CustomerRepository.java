package de.dd.timesheet.repository;

import de.dd.timesheet.model.Customer;
import java.util.List;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;

@Stateless
@TransactionAttribute(TransactionAttributeType.REQUIRED)
public class CustomerRepository extends BasicRepository<Customer> {

    public CustomerRepository() {
        super(Customer.class);
    }

    @Override
    public List<Customer> getAll() {
        return super.getAll(); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Customer merge(Customer entity) {
        return super.merge(entity); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Customer findById(Integer id) {
        return super.findById(id); //To change body of generated methods, choose Tools | Templates.
    }
    
    
}
