package de.dd.timesheet.model.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *
 * @author dominik mathmann
 */
public class SummaryDayDTO {
    
    private List<SummaryProjectDayDTO> entries;
    
    private Date date;
    
    private Long sum=new Long(0);

    public SummaryDayDTO(Date date) {
        this.date = date;
        this.entries=new ArrayList<>();
    }
    
    public void addTime(long add)
    {
        this.sum=this.sum+add;
    }

    public List<SummaryProjectDayDTO> getEntries() {
        if (entries==null)
        {
            entries=new ArrayList<SummaryProjectDayDTO>();
        }
        return entries;
    }

    public void setEntries(List<SummaryProjectDayDTO> entries) {
        this.entries = entries;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getSum() {
        return sum;
    }

    public void setSum(Long sum) {
        this.sum = sum;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 79 * hash + (this.date != null ? this.date.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final SummaryDayDTO other = (SummaryDayDTO) obj;
        if (this.date != other.date && (this.date == null || !this.date.equals(other.date))) {
            return false;
        }
        return true;
    }
    
    
    
    
    
}
