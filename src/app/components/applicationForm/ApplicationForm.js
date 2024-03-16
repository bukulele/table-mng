import React from "react";
import { useForm } from "react-hook-form";
import styles from "./applicationForm.module.css";
import Input from "./Input";

function ApplicationForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input type="text" register={register} label="First Name" />
      <Input type="text" register={register} label="Last Name" />
      <Input type="date" register={register} label="Date of Birth" />
      <Input type="tel" register={register} label="Phone Number" />
      <Input type="email" register={register} label="Email" />
      <Input type="text" register={register} label="Routes" />
      <Input type="file" register={register} label="Criminal Record Scan" />
      <Input
        type="date"
        register={register}
        label="Criminal Record Issue Date"
      />
      <Input type="file" register={register} label="Roadtest scan" />
      <Input type="date" register={register} label="Roadtest date" />
      <Input
        type="file"
        register={register}
        label="Consent to personal investigation"
      />
      <Input type="file" register={register} label="Reference check result" />
      <input value="Submit form" type="submit" />
    </form>
  );
}

export default ApplicationForm;
