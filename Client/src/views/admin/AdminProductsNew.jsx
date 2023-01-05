import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import AdminProductForm from "./AdminProductForm";
import { productSchema } from "../../validations/productSchema";
import { createProduct } from "../../services/productService";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase";
import { useState } from "react";

const AdminProductsNew = () => {
  const [isFileUploading, setIsFileUploading] = useState(false);

  const mutation = useMutation({
    mutationFn: (newProduct) => createProduct(newProduct),
    onSuccess: () => {
      reset();
      toast.success("🦄 Successful 🦄");
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(productSchema) }); //(?)

  // Dùng useMutation() để update(post) dự liệu lên database

  const onSubmit = (data) => {
    console.log(data);
    const file = data.image[0];
    const category = data.category;

    // Upload file and metadata to the object 'products/smartphones/ip14'
    const storageRef = ref(storage, `/products/${category}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case "running":
            setIsFileUploading(true);
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsFileUploading(false);
          console.log(downloadURL);
          mutation.mutate({ ...data, imageUrl: downloadURL });
        });
      }
    );
  };

  return (
    <AdminProductForm
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      isLoading={mutation.isLoading || isFileUploading}
      errors={errors}
      btnLabel="Add product"
      watch={watch}
    />
  );
};

export default AdminProductsNew;
