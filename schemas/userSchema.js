import { object, string, date } from 'yup';

export const userSchema = object({
    name : string().required().min(3),
    email: string().required().email(),
    password: string().required().min(6).max(15)
})

export const LoginSchema = object({
    email: string().required().email(),
    password: string().required().min(6).max(15)
})

export const ProfileSchema = object({
    status: string().required(),
    skills: string().required()
})

export const ExperienceSchema = object({
    title: string().required(),
    company: string().required(),
    from: date().required()
})

export const EducationSchema = object({
    school: string().required(),
    degree: string().required(),
    fieldOfStudy: string().required(),
    from: date().required()
})

export const PostSchema = object({
    text: string().required()
})