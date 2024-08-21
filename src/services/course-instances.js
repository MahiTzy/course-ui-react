import { axiosInstance } from "./index";

export const getCourseInstancesByYearAndSemester = (year, semester) => {
    return axiosInstance.get(`/instances/${year}/${semester}`).then(response => {
        return response.data;
    });
}

export const addCourseInstance = (courseInstance) => {
    return axiosInstance.post(`/instances`, courseInstance).then(response => {
        return response.data;
    });
}

export const getCourseInstanceById = (year, semester, id) => {
    return axiosInstance.get(`/instances/${year}/${semester}/${id}`).then(response => {
        return response.data;
    });
}

export const deleteCourseInstance = (year, semester, id) => {
    return axiosInstance.delete(`/instances/${year}/${semester}/${id}`).then(response => {
        return response.data;
    });
}