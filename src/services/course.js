import { axiosInstance } from ".";

export const getAllCourses = () => {
    return axiosInstance.get(`/courses`).then(response => {
        return response.data;
    });
}

export const getCourseById = (id) => {
    return axiosInstance.get(`/courses/${id}`).then(response => {
        return response.data;
    });
}

export const addCourse = (course) => {
    return axiosInstance.post(`/courses`, course).then(response => {
        return response.data;
    });
}

export const deleteCourse = (id) => {
    return axiosInstance.delete(`/courses/${id}`).then(response => {
        return response.data;
    });
}