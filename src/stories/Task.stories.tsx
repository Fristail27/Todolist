import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import Task, { TaskPropsType } from '../Task';

export default {
    title: 'Todolist/Task',
    component: Task,
    argTypes: {
        onClick: {
            description: "Button inside from clicked"
        },
    },
} as Meta;

const changeStatusCallback = action("Status changed")
const changeTaskTitleCallback = action("Title changed")
const removeTaskCallback = action("Task removed")

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const  baseArgs = {
    changeStatus: changeStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
}

export const TaskNotDoneExample = Template.bind({});

TaskNotDoneExample.args = {
    ...baseArgs,
    id:"1",
    isDone: false,
    title:"JS",
    todolistID: "todolist1"

}
export const TaskIsDoneExample = Template.bind({});

TaskIsDoneExample.args = {
    ...baseArgs,
    id:"1",
    isDone: true,
    title:"JS",
    todolistID: "todolist1"

}
