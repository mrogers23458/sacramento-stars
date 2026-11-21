"use client";

import { useState } from "react";
import { parseInterest, type InterestLead, type InterestState } from "@/lib/interest";
import { ages, birthYears, contact, type AgeId } from "@/lib/site";

const initialState: InterestState = { status: "idle" };

function attachCampaign(formData: FormData) {
  const params = new URLSearchParams(window.location.search);
  formData.set("utm_source", params.get("utm_source") ?? "");
  formData.set("utm_medium", params.get("utm_medium") ?? "");
  formData.set("utm_campaign", params.get("utm_campaign") ?? "");
  formData.set("utm_content", params.get("utm_content") ?? "");
  formData.set("utm_term", params.get("utm_term") ?? "");
}

function mailHrefFor(lead: InterestLead) {
  const subject = `Interest list · ${lead.age} · ${lead.playerFirstName}`;
  const body = [
    `Parent: ${lead.parentName}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Player: ${lead.playerFirstName}`,
    `Age: ${lead.age}`,
    `Birth year: ${lead.birthYear}`,
    `Current team: ${lead.currentTeam}`,
    lead.position ? `Position: ${lead.position}` : "",
    lead.note ? `Note: ${lead.note}` : "",
    `Page: ${lead.page}`,
    [lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(" / ")
      ? `Campaign: ${[lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(" / ")}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function deliverInterest(formData: FormData): InterestState {
  const parsed = parseInterest(formData);
  if (!parsed.ok) {
    return {
      status: "error",
      message: "Check the highlighted fields and send it again.",
      fieldErrors: parsed.fieldErrors,
    };
  }
  if ("ignored" in parsed) return { status: "success" };

  const mailHref = mailHrefFor(parsed.lead);
  window.location.href = mailHref;
  return {
    status: "error",
    mailHref,
    message: `Open the email and press send. Your details are already filled in, and it goes to ${contact.email}.`,
  };
}

export function InterestForm({
  age,
  page,
}: {
  age?: AgeId;
  page: string;
}) {
  const [state, setState] = useState<InterestState>(initialState);

  if (state.status === "success") {
    return (
      <div className="border border-line bg-raised p-8 sm:p-10" role="status">
        <p className="kicker text-signal">Interest list</p>
        <h2 className="display mt-4 text-6xl sm:text-7xl">You&apos;re on the list.</h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed">
          Sacramento Stars will follow up about a private evaluation.
        </p>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};

  return (
    <form
      className="relative border border-line bg-raised p-6 sm:p-10"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        attachCampaign(formData);
        setState(deliverInterest(formData));
      }}
    >
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="page" value={page} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Parent name" name="parentName" error={errors.parentName} autoComplete="name" />
        <Field
          label="Email"
          name="email"
          type="email"
          error={errors.email}
          autoComplete="email"
        />
        <Field label="Phone" name="phone" type="tel" error={errors.phone} autoComplete="tel" />
        <Field label="Player first name" name="playerFirstName" error={errors.playerFirstName} />
        <label className="block">
          <span className="kicker">Age group</span>
          <select
            name="age"
            defaultValue={age ?? ""}
            className="field mt-2"
            aria-invalid={errors.age ? true : undefined}
            required
          >
            <option value="" disabled>
              Choose an age
            </option>
            {ages.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          {errors.age ? <ErrorText>{errors.age}</ErrorText> : null}
        </label>
        <label className="block">
          <span className="kicker">Birth year</span>
          <select
            name="birthYear"
            defaultValue=""
            className="field mt-2"
            aria-invalid={errors.birthYear ? true : undefined}
            required
          >
            <option value="" disabled>
              Birth year
            </option>
            {birthYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.birthYear ? <ErrorText>{errors.birthYear}</ErrorText> : null}
        </label>
        <Field
          label="Current team"
          name="currentTeam"
          error={errors.currentTeam}
          placeholder="Current team, or none"
        />
        <Field label="Position" name="position" error={errors.position} placeholder="Optional" />
      </div>
      <label className="mt-5 block">
        <span className="kicker">Note</span>
        <textarea
          name="note"
          rows={4}
          placeholder="Optional"
          className="field mt-2"
          aria-invalid={errors.note ? true : undefined}
        />
        {errors.note ? <ErrorText>{errors.note}</ErrorText> : null}
      </label>

      {state.status === "error" && state.message ? (
        <div className="mt-5" role="alert">
          <p className="text-sm leading-relaxed text-signal">{state.message}</p>
          {state.mailHref ? (
            <a className="btn mt-4 inline-flex" href={state.mailHref}>
              Open the email
            </a>
          ) : null}
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="btn inline-flex w-full sm:w-auto">
          Join the interest list
        </button>
        <p className="max-w-md text-sm leading-relaxed text-muted">
          The team will follow up about a private evaluation. Questions go to{" "}
          <a className="text-foreground underline" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          .
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="kicker">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={name !== "position"}
        aria-invalid={error ? true : undefined}
        className="field mt-2"
      />
      {error ? <ErrorText>{error}</ErrorText> : null}
    </label>
  );
}

function ErrorText({ children }: { children: string }) {
  return <span className="mt-2 block text-sm text-signal">{children}</span>;
}
