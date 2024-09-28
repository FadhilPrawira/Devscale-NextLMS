import { Button } from "@components/button";
import { CertificateServices } from "services/certificate.services";

import { approveCertificateAction } from "./action";
import serverAuth from "libs/server-auth";
import { redirect } from "next/navigation";
import { DownloadBtn } from "app/(platform)/dashboard/certificates/comp.download";

export default async function Page() {
  const auth = serverAuth();

  if (!auth) {
    redirect("/login");
  }
  const certificates = await CertificateServices.getAll();
  return (
    <main className="space-y-4">
      <section className="px-12 pt-12">
        <h3>Certificate Approvals</h3>
      </section>
      <section>
        <table className="w-full table-auto">
          <thead className="rounded-xl border-y border-slate-200 bg-white">
            <tr className="text-left">
              <th className="py-5 pl-12">Course</th>
              <th>User</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => {
              return (
                <tr key={cert.id}>
                  <td className="py-5 pl-12">{cert.course.title}</td>
                  <td>{cert.user.name}</td>
                  <td>{cert.status}</td>
                  <td>
                    {
                      // If the certificate status is NO_REQUEST, the button should be disabled and red
                      // If the certificate status is REQUESTED, the button should be enabled and blue
                      // If the certificate status is APPROVED, the button should be disabled and green
                    }
                    {cert.status === "NO_REQUEST" ? (
                      <p>No Action</p>
                    ) : cert.status === "UNDER_REVIEW" ? (
                      <form action={approveCertificateAction}>
                        <input type="hidden" name="certificateId" value={cert.id} required />
                        <Button size="sm" className="w-fit" variant="primary">
                          Approve
                        </Button>
                      </form>
                    ) : (
                      <DownloadBtn certificateId={cert.id} />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
