import type { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "../textarea";

const meta = {
  title: "Text Area",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextAreaPrimary: Story = {
  args: {
    placeholder: "Input your text",
  },
};
