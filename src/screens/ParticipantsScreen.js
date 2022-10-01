import { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import {
  Form,
  List,
  Divider,
  Container,
  Grid,
  Button,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";

// TODO: Seite wechseln
// TODO: fokus in feld zu Beginn setzen

export default function ParticipantsScreen() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coffeeBreakSession, setCoffeeBreakSession] = useState(
    new Parse.Object("CoffeeBreakSession")
  );
  let { id } = useParams();
  useEffect(() => {
    getCoffeeBreakSession(id, setList, setCoffeeBreakSession, setLoading);
  }, [id, setList, setCoffeeBreakSession, setLoading]);
  return (
    <div>
      <Grid textAlign="center">
        <Form
          onSubmit={(event) =>
            addParticipantToSession(
              event,
              name,
              list,
              error,
              setError,
              setName("")
            )
          }
        >
          <Form.Group></Form.Group>
          <Form.Input
            disabled={loading}
            value={name}
            onChange={(e) => {
              validate(e.target.value, list, setError);
              setName(e.target.value);
            }}
            fluid={false}
            placeholder="Max Mustermann"
            error={
              error
                ? {
                    content: "Gebe mindestens vier unterschiedliche Namen ein.",
                    pointing: "below",
                  }
                : null
            }
            icon={{
              name: "add",
              circular: true,
              link: true,
              inverted: true,
              onClick: (event) =>
                addParticipantToSession(
                  event,
                  name,
                  list,
                  error,
                  setError,
                  setName("")
                ),
            }}
          />
        </Form>

        <Grid.Row columns={5}>
          <Grid.Column floated="right">
            <Button
              loading={loading}
              primary
              disabled={list.length < 4}
              onClick={() => submitList(list, coffeeBreakSession, setLoading)}
            >
              Bestätigen &amp; Weiter
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <Container textAlign="left">
        <List>
          {list.map((el, i) => (
            <List.Item key={i}>
              <List.Icon
                onClick={() => {
                  const newList = list.filter((value) => value !== el);
                  setList(newList);
                }}
                inverted
                color="grey"
                size="large"
                link
                name="trash alternate"
              />
              <List.Content>{el}</List.Content>
            </List.Item>
          ))}
        </List>
      </Container>
    </div>
  );
}

async function getCoffeeBreakSession(
  id,
  setList,
  setCoffeeBreakSession,
  setLoading
) {
  setLoading(true);
  const query = new Parse.Query("CoffeeBreakSession");
  query.equalTo("objectId", id);
  try {
    const result = await query.first();
    setList(result.get("participants"));
    setCoffeeBreakSession(result);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    alert("Failed to fetch object: " + error.message);
  }
}

async function submitList(list, coffeeBreakSession, setLoading) {
  setLoading(true);
  coffeeBreakSession.set("participants", list);
  try {
    await coffeeBreakSession.save();
    setLoading(false);
    // TODO navigate
  } catch (error) {
    alert("Failed to create new object: " + error.message);
    setLoading(false);
  }
}

function validate(el, list, setError) {
  if (!el) return setError(true);
  const filteredList = list.filter((value) => value === el);
  if (filteredList.length > 0) {
    return setError(true);
  } else {
    return setError(false);
  }
}

function addParticipantToSession(event, name, list, error, setError) {
  event.preventDefault();
  validate(name, list, setError);
  if (error || !name) {
    return;
  }
  list.push(name);
}
