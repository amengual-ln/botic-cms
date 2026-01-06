import type { CollectionConfig } from "payload";

export const AcquisitionLeads: CollectionConfig = {
  slug: "acquisition-leads",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "company", "email", "phone", "source", "status", "createdAt"],
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== "create") return;

        const to = process.env.ACQUISITION_NOTIFY_EMAIL || "admin@boticpartners.com";

        try {
          await req.payload.sendEmail({
            to,
            subject: `[Acquisition] New contact — ${doc.name} (${doc.company})`,
            text: [
              `Name: ${doc.name}`,
              `Company: ${doc.company}`,
              `Email: ${doc.email}`,
              `Phone: ${doc.phone}`,
              `Source: ${doc.source ?? "-"}`,
              ``,
              `Created At: ${doc.createdAt ?? ""}`,
            ].join("\n"),
          });
        } catch (err) {
          req.payload.logger.error({ err }, "Acquisition email failed");
        }
      },
    ],
  },

  fields: [
    { name: "name", type: "text", required: true },
    { name: "company", type: "text", required: true },
    { name: "phone", type: "text", required: true },
    { name: "email", type: "email", required: true, index: true },
    { name: "source", type: "text" },

    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Closed", value: "closed" },
      ],
      admin: { position: "sidebar" },
    },
  ],

  timestamps: true,
};
