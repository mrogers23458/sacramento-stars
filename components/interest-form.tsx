"use client";

import { useState } from "react";
import { parseInterest, type InterestState } from "@/lib/interest";
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

async function deliverInterest(formData: FormData): Promise<InterestState> {
  const parsed = parseInterest(formData);
  if (!parsed.ok) {
    return {
      status: "error",
      message: "Check the highlighted fields and send it again.",
      fieldErrors: parsed.fieldErrors,
    };
  }
  if ("ignored" in parsed) return { status: "success" };

  const lead = parsed.lead;
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${contact.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        name: lead.parentName,
        email: lead.email,
        phone: lead.phone,
        player: lead.playerFirstName,
        age: lead.age,
        birthYear: lead.birthYear,
        currentTeam: lead.currentTeam,
        position: lead.position,
        message: lead.note,
        page: lead.page,
        utm_source: lead.utmSource,
        utm_medium: lead.utmMedium,
        utm_campaign: lead.utmCampaign,
        utm_content: lead.utmContent,
        utm_term: lead.utmTerm,
        _subject: `Interest list · ${lead.age} · ${lead.playerFirstName}`,
        _template: "table",
        _captcha: "false",
        _replyto: lead.email,
      }),
    });
    const data = (await response.json().catch(() => null)) as { success?: string } | null;
    if (response.ok && String(data?.success) === "true") return { status: "success" };
    return {
      status: "error",
      message: `Email ${contact.email} and the team will add you to the list.`,
    };
  } catch {
    return {
      status: "error",
      message: `Email ${contact.email} and the team will add you to the list.`,
    };
  } finally {
    window.clearTimeout(timer);
  }
}

export function InterestForm({
  age,
  page,
}: {
  age?: AgeId;
  page: string;
}) {
  const [state, setState] = useState<InterestState>(initialState);
  const [pending, setPending] = useState(false);

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
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        attachCampaign(formData);
        setPending(true);
        const result = await deliverInterest(formData);
        setPending(false);
        setState(result);
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
        <p className="mt-5 text-sm leading-relaxed text-signal" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="btn inline-flex w-full sm:w-auto" disabled={pending}>
          {pending ? "Sending" : "Join the interest list"}
        </button>
        <p className="max-w-md text-sm leading-relaxed text-muted">
          The team will follow up about a private evaluation.
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
