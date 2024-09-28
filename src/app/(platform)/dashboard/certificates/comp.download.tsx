"use client";

import { Button } from "@components/button";
import React, { useActionState } from "react";

import downloadCertificateAction from "./action.download";

export const DownloadBtn = ({ certificateId }: { certificateId: string }) => {
  const [_, formAction, pending] = useActionState(downloadCertificateAction, null);

  return (
    <form action={formAction}>
      <input name="certificateId" value={certificateId} type="hidden" />
      <Button disabled={pending} size="sm" className="w-fit" variant="success">
        Download Certificate
      </Button>
    </form>
  );
};
