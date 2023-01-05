import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import GlobalSpinner from "../../components/common/GlobalSpinner";
import { useEffect, useState } from "react";
import AdminProductForm from "./AdminProductForm";
import { productSchema } from "../../validations/productSchema";
import useProduct from "../../hooks/products/useProduct";
import { updateProductById } from "../../services/productService";
import { storage } from "../../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const AdminProductsEdit = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [isFileUploading, setIsFileUploading] = useState(false);

  // Fecth product by Id
  const { data, isLoading } = useProduct(productId);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({ resolver: yupResolver(productSchema) }); //(?)

  // console.log(watch("description"));

  // Reset data form after fetching from srever
  useEffect(() => {
    reset(data?.data);
  }, [data]);

  // Update product
  // Dùng useMutation() để update(post) dự liệu lên database
  const mutation = useMutation({
    mutationFn: (newProduct) => updateProductById(productId, newProduct),
    onSuccess: () => {
      navigate("/admin/products");
      toast.success("🦄 Successful save product 🦄");
    },
  });

  if (isLoading) return <GlobalSpinner />;

  console.log(dirtyFields);

  const onSubmit = (data) => {
    // if (dirtyFields.image) {
    //   const file = data.image[0];
    //   const category = data.category;

    //   // Upload file and metadata to the object 'products/smartphones/ip14'
    //   const storageRef = ref(storage, `/products/${category}/${file.name}`);
    //   const uploadTask = uploadBytesResumable(storageRef, file);

    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //       switch (snapshot.state) {
    //         case "running":
    //           setIsFileUploading(true);
    //           break;
    //       }
    //     },
    //     (error) => {
    //       // Handle unsuccessful uploads
    //     },
    //     () => {
    //       // Upload completed successfully, now we can get the download URL
    //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //         setIsFileUploading(false);
    //         console.log(downloadURL);
    //         mutation.mutate({ ...data, imageUrl: downloadURL });
    //       });
    //     }
    //   );
    // } else {
    //   mutation.mutate(data);
    // }

    mutation.mutate(data)
  };

  return (
    <AdminProductForm
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      isLoading={mutation.isLoading || isFileUploading}
      errors={errors}
      btnLabel="Save"
      isDirty={isDirty}
      watch={watch}
    />
  );
};

export default AdminProductsEdit;
