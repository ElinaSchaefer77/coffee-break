import { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import { Form, Grid, Button } from "semantic-ui-react";
import { useParams, useNavigate } from "react-router-dom";

// TODO nur ganze Zahlen
// TODO min. 2 Personen pro Raum

// TODO: fokus in feld zu Beginn setzen

export default function App() {
  const [rooms, setRooms] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coffeeBreakSession, setCoffeeBreakSession] = useState();
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCoffeeBreakSession(id, setRooms, setCoffeeBreakSession, setLoading);
  }, [id, setRooms, setCoffeeBreakSession, setLoading]);

  return (
    <div>
      {console.log("test", process.env.PUBLIC_URL)}
      <Grid textAlign="center">
        <Form>
          <Form.Group></Form.Group>
          <Form.Input
            type="number"
            disabled={loading}
            value={rooms}
            onChange={(e) => {
              validate(e.target.value, setError);
              setRooms(e.target.value);
            }}
            fluid={false}
            placeholder={4}
            error={
              error
                ? {
                    content: "Gebe eine Zahl ein, die größer als 1 ist.",
                    pointing: "below",
                  }
                : null
            }
          />
        </Form>

        <Grid.Row columns={5}>
          <Grid.Column floated="left">
            <Button secondary onClick={() => navigate(`/${id}`)}>
              Zurück
            </Button>
          </Grid.Column>
          <Grid.Column floated="right">
            <Button
              loading={loading}
              primary
              disabled={!rooms || rooms < 2}
              onClick={() =>
                submitNumber(rooms, coffeeBreakSession, setLoading, navigate)
              }
            >
              Bestätigen &amp; Weiter
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

async function submitNumber(rooms, coffeeBreakSession, setLoading, navigate) {
  setLoading(true);
  coffeeBreakSession.set("rooms", Number(rooms));
  try {
    const result = await coffeeBreakSession.save();
    setLoading(false);
    navigate(`/${result.id}/rooms/result`);
  } catch (error) {
    alert("Failed to create new object: " + error.message);
    setLoading(false);
  }
}

function validate(el, setError) {
  if (!el) return setError(true);
  if (el < 2) {
    return setError(true);
  } else {
    return setError(false);
  }
}

async function getCoffeeBreakSession(
  id,
  setRooms,
  setCoffeeBreakSession,
  setLoading
) {
  setLoading(true);
  const query = new Parse.Query("CoffeeBreakSession");
  query.equalTo("objectId", id);
  try {
    const result = await query.first();
    setRooms(result.get("rooms"));
    setCoffeeBreakSession(result);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    alert("Failed to fetch object: " + error.message);
  }
}
