export const SET_DIARY = "SET_DIARY";

export const setDiary = (id, emotion, diary) => {
    return {
        type : SET_DIARY,
        payload : {
            id,
            emotion,
            diary
        },
    }
}