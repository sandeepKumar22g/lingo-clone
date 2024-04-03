import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
})

export const coursesRelations = relations(courses, ({many})=>({
    userProgress: many(userProgress),
    units: many(units)
}))

export const units = pgTable("units", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(), //Unit 1
    description: text("description").notNull(), //Learn the basic of spanish
    courseId: integer("course_id").references(() => courses.id, {onDelete: "cascade"}).notNull(),
    order: integer("order").notNull(),
})

const unitRelations = relations(units, ({many, one})=>({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id]
    })
}))

export const userProgress = pgTable("user_progress", {
    userId: text("user_id").primaryKey(),
    userName: text("user_name").notNull().default("User"),
    userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
    activeCourseId : integer("active_course_id").references(()=>courses.id, {onDelete: "cascade"}),
    hearts: integer("hearts").notNull().default(5),
    points: integer("points").notNull().default(0)
})

export const userProgressRelatons = relations(userProgress, ({one})=>({
    activeCourses: one(courses, {
        fields: [userProgress.activeCourseId], 
        references: [courses.id]
    })
}))