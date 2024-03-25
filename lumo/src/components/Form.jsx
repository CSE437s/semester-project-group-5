import { Box } from "@mui/material";

function Form(props) {
  const { action, ...rest } = props;

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the page from reloading.
    const formData = new FormData(event.currentTarget);
    action(formData);
  };

  return <Box {...rest} component="form" onSubmit={handleSubmit} />;
}

export default Form;
