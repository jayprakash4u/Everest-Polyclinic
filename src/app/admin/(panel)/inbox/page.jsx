"use client";

import { useEffect, useState } from "react";
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminShell";

export default function InboxAdminPage() {
  const [contacts, setContacts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/inbox")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data.contacts ?? []);
        setAppointments(data.appointments ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-sm text-slate-500">Loading inbox...</p>;
  }

  return (
    <>
      <AdminPageHeader
        title="Inbox"
        subtitle="Contact messages and appointment requests from the website."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <AdminCard>
          <h3 className="mb-4 font-heading text-lg font-bold text-slate-900">
            Contact Messages ({contacts.length})
          </h3>
          <div className="space-y-3">
            {contacts.length === 0 ? (
              <p className="text-sm text-slate-500">No messages yet.</p>
            ) : (
              contacts.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-100 p-4">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-primary-600">
                    {item.email} · {new Date(item.createdAt).toLocaleString()}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{item.message}</p>
                </div>
              ))
            )}
          </div>
        </AdminCard>

        <AdminCard>
          <h3 className="mb-4 font-heading text-lg font-bold text-slate-900">
            Appointments ({appointments.length})
          </h3>
          <div className="space-y-3">
            {appointments.length === 0 ? (
              <p className="text-sm text-slate-500">No appointment requests yet.</p>
            ) : (
              appointments.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-100 p-4">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-primary-600">
                    {item.phone} · {new Date(item.createdAt).toLocaleString()}
                  </p>
                  {item.department ? (
                    <p className="mt-1 text-sm text-slate-600">
                      Department: {item.department}
                    </p>
                  ) : null}
                  {item.packageName ? (
                    <p className="text-sm text-slate-600">
                      Package: {item.packageName} ({item.packagePrice})
                    </p>
                  ) : null}
                  {item.message ? (
                    <p className="mt-2 text-sm text-slate-500">{item.message}</p>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </AdminCard>
      </div>
    </>
  );
}
