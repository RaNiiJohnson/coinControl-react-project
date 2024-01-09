import { TrashIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Form, NavLink } from "react-router-dom";

export default function Nav({ userName }) {
  return (
    <nav>
      <NavLink to="/">
        <span>NoteWave</span>
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="/logout"
          onSubmit={(event) => {
            if (!confirm("Delete user and all data?")) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn btn--warning">
            <span>Sortir</span>
            <TrashIcon width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
}
