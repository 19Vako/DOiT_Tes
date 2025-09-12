"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Snackbar,
  IconButton,
} from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import SubjectIcon from "@mui/icons-material/Subject";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createPost } from "@/store/slices/postsSlice";

const steps = ["Заголовок", "Тіло", "Попередній перегляд"];

export default function CreatePostPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setPreviewOpen(true);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleCreate = () => {
    dispatch(createPost({ title, body }));
    setPreviewOpen(false);
    setSnackbarOpen(true);
    setTitle("");
    setBody("");
    setActiveStep(0);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <TextField
          fullWidth
          label="Заголовок"
          placeholder="Введіть заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{
            startAdornment: <TitleIcon sx={{ mr: 1 }} />,
          }}
          sx={{ mb: 3 }}
        />
      )}

      {activeStep === 1 && (
        <TextField
          fullWidth
          label="Тіло поста"
          placeholder="Введіть текст поста"
          multiline
          minRows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          InputProps={{
            startAdornment: <SubjectIcon sx={{ mr: 1 }} />,
          }}
          sx={{ mb: 3 }}
        />
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Назад
        </Button>
        <Button variant="contained" onClick={handleNext} disabled={activeStep === 0 && !title || activeStep === 1 && !body}>
          {activeStep === steps.length - 1 ? "Попередній перегляд" : "Далі"}
        </Button>
      </Box>


      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)}>
        <DialogTitle>Попередній перегляд поста</DialogTitle>
        <DialogContent>
          <Typography variant="h6">{title}</Typography>
          <Typography sx={{ mt: 2 }}>{body}</Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button onClick={() => setPreviewOpen(false)} sx={{ mr: 2 }}>
              Назад
            </Button>
            <Button variant="contained" onClick={handleCreate}>
              Створити
            </Button>
          </Box>
        </DialogContent>
      </Dialog>


      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Пост успішно створено!"
        action={
          <IconButton size="small" color="inherit" onClick={() => setSnackbarOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
}
