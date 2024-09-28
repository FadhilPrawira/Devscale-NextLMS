"use client";
import { Button } from "@components/button";
import { useActionState } from "react";

import { unbanUserAction } from "./action.unban";

export const UnbanUser = ({ userId }: { userId: string }) => {
  const [_, formAction, pending] = useActionState(unbanUserAction, null);
  return (
    <form action={formAction}>
      <input type="hidden" name="userId" value={userId} required />
      <Button variant="secondary" disabled={pending} className="w-fit" size="sm">
        Unban
      </Button>
    </form>
  );
};
