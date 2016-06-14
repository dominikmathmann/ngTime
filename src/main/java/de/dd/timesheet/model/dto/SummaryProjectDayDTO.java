/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package de.dd.timesheet.model.dto;

import java.util.Date;

/**
 *
 * @author dominik mathmann
 */
public class SummaryProjectDayDTO
{

    private Long time;

    private String tasks;
    
    private String project;
    
    private Date date;

    public SummaryProjectDayDTO() {
    }

    public SummaryProjectDayDTO(String project, Date date) {
        this.project = project;
        this.date = date;
    }
    
    
    
    public void addTime(Long timeToAdd)
    {
        setTime(this.getTime() + timeToAdd);
    }

    public void addTask(String task)
    {
        if (this.getTasks().length() == 0)
        {
            setTasks(task);
        }
        else if (!this.getTasks().contains(task))
        {
            setTasks(this.getTasks() + ", " + task);
        }
    }

    /**
     * @return the time
     */
    public Long getTime()
    {
        if (time == null)
        {
            time = new Long(0);
        }
        return time;
    }
    
    public Double getOutputTime()
    {
        return Math.ceil(getTime() / 1000. / 60. / 60. /0.25)*0.25;
    }

    /**
     * @param time the time to set
     */
    public void setTime(Long time)
    {
        this.time = time;
    }

    /**
     * @return the tasks
     */
    public String getTasks()
    {
        if (tasks == null)
        {
            tasks = new String();
        }
        return tasks;
    }

    /**
     * @param tasks the tasks to set
     */
    public void setTasks(String tasks)
    {
        this.tasks = tasks;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    
    

}
