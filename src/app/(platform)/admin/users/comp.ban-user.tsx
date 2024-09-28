"use client";
import { Button } from "@components/button";
import { useActionState } from "react";

import { banUserAction } from "./action.ban";

export const BanUser = ({ userId }: { userId: string }) => {
  const [_, formAction, pending] = useActionState(banUserAction, null);
  return (
    <form action={formAction}>
      <input type="hidden" name="userId" value={userId} required />
      <Button variant="danger" disabled={pending} className="w-fit" size="sm">
        Ban
      </Button>
    </form>
  );
};
