package de.dd.timesheet.model.dto;

public class SingleValue<T> {

    private T data;

    public SingleValue(T data) {
        this.data = data;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

}
