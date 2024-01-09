import { Form } from "react-router-dom";

//library
import { UserPlusIcon } from "@heroicons/react/24/solid";

export default function Intro() {
  return (
    <div className="intro">
      <h1>L'harmonie des Pensées</h1>
      <p>Votre espace créatif pour noter, organiser et reviser vos idées.</p>
      <Form method="post">
        <input type="text" name="userName" required placeholder="Votre Nom?" />
        <input type="hidden" name="_action" value="newUser" />
        <button type="submit">
          <span>Naviguer</span>
          <UserPlusIcon width={20} />
        </button>
      </Form>
    </div>
  );
}
