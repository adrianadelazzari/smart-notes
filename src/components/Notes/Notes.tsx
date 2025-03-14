import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  CardActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useThemeProvider } from "../../theme/ThemeProvider";

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function Notes() {
  const { theme } = useThemeProvider();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editNoteId, setEditNoteId] = useState<number | null>(null);
  const [editNote, setEditNote] = useState({ title: "", content: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      setError("Both title and content are required.");
      return;
    }
    setNotes([...notes, { id: Date.now(), ...newNote }]);
    setNewNote({ title: "", content: "" });
    setError("");
  };

  const cancelNewNote = () => {
    setNewNote({ title: "", content: "" });
    setError("");
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const startEditing = (note: Note) => {
    setEditNoteId(note.id);
    setEditNote({ title: note.title, content: note.content });
  };

  const saveEditedNote = () => {
    if (!editNote.title.trim() || !editNote.content.trim()) {
      setError("Both title and content are required.");
      return;
    }
    setNotes(
      notes.map((note) =>
        note.id === editNoteId ? { ...note, ...editNote } : note
      )
    );
    setEditNoteId(null);
    setEditNote({ title: "", content: "" });
    setError("");
  };

  const cancelEditing = () => {
    setEditNoteId(null);
    setEditNote({ title: "", content: "" });
    setError("");
  };

  return (
    <Box>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={newNote.title}
        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        error={!!error && !newNote.title.trim()}
        helperText={!!error && !newNote.title.trim() ? "Title is required" : ""}
      />
      <TextField
        label="Content"
        variant="outlined"
        multiline
        rows={3}
        fullWidth
        sx={{ marginBottom: 2 }}
        value={newNote.content}
        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        error={!!error && !newNote.content.trim()}
        helperText={
          !!error && !newNote.content.trim() ? "Content is required" : ""
        }
      />

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
            "&:hover": { backgroundColor: theme.palette.primary.dark },
          }}
          fullWidth
          onClick={addNote}
          disabled={!newNote.title.trim() || !newNote.content.trim()}
        >
          Add Note
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={cancelNewNote}
          startIcon={<CancelIcon />}
        >
          Cancel
        </Button>
      </Stack>

      <Grid container spacing={2} mt={2}>
        {notes.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Card
              sx={{
                paddingX: 2,
                boxShadow: 3,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <CardContent>
                {editNoteId === note.id ? (
                  <>
                    <TextField
                      label="Edit Title"
                      variant="outlined"
                      fullWidth
                      sx={{ marginTop: 3, marginBottom: 1 }}
                      value={editNote.title}
                      onChange={(e) =>
                        setEditNote({ ...editNote, title: e.target.value })
                      }
                    />
                    <TextField
                      label="Edit Content"
                      variant="outlined"
                      multiline
                      rows={3}
                      fullWidth
                      sx={{ marginY: 2 }}
                      value={editNote.content}
                      onChange={(e) =>
                        setEditNote({ ...editNote, content: e.target.value })
                      }
                    />
                    <CardActions sx={{ justifyContent: "center", gap: "10px" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<SaveIcon />}
                        onClick={saveEditedNote}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        startIcon={<CancelIcon />}
                        onClick={cancelEditing}
                      >
                        Cancel
                      </Button>
                    </CardActions>
                  </>
                ) : (
                  <>
                    <Typography variant="h6">{note.title}</Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ marginTop: "15px" }}
                    >
                      {note.content}
                    </Typography>
                    <CardActions
                      sx={{
                        justifyContent: "start",
                        gap: "10px",
                        marginTop: "20px",
                        paddingX: 0,
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                          "&:hover": {
                            backgroundColor: theme.palette.primary.dark,
                          },
                        }}
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => startEditing(note)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteNote(note.id)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
