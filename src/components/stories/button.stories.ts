import type { Meta, StoryObj } from "@storybook/react";
import { title } from "process";

import { Button } from "../button";

const meta = {
    title: "Button",
    component: Button,
    parameters: {
        layout: "centered"
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta
type Story = StoryObj<typeof meta>

export const ButtonPrimary: Story = {};