import FormRow from "../../components/common/FormRow";
import FormRowError from "../../components/common/FormRowError";
import Loader from "../../components/common/Loader";

const categories = [
  { value: "smartphones", name: "Smartphones" },
  { value: "laptop", name: "Laptop" },
  { value: "gear", name: "PC Gear" },
  { value: "charge", name: "Charger" },
];

const AdminProductForm = ({
  onSubmit,
  register,
  errors,
  isLoading,
  btnLabel,
  watch,
  isDirty = "true",
}) => {
  return (
    <div>
      {/* Container */}
      <div className="mx-auto max-w-screen-md px-4">
        {/* Layout */}
        <div className="py-6">
          <form onSubmit={onSubmit}>
            {/* Fields */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              {/* Title */}
              <FormRow label="Title" className="col-span-full">
                <input
                  type="text"
                  placeholder="Input information"
                  className="input input-bordered input-warning w-full text-sm"
                  {...register("title")} //(?) // React-hook-form
                />
                {/* {errors.title && (
            <p className="text-sm text-red-600 mt-2">
              <div className="flex gap-2 items-center">
                {errors.title.message}
                <ErrorIcon className="icon icon-sm"/>
              </div>
            </p>
          )} */}
                <FormRowError error={errors.title} />
              </FormRow>

              {/* Category */}
              <FormRow label="Category">
                <select
                  className="select select-warning w-full text-sm"
                  defaultValue="default"
                  {...register("category")}
                >
                  <option disabled value="default">
                    Choose Category:
                  </option>
                  {categories.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <FormRowError error={errors.category} />
              </FormRow>

              {/* Price */}
              <FormRow label="Price">
                <label className="input-group">
                  <input
                    type="number"
                    placeholder="0.01"
                    step={0.01}
                    className="input input-bordered input-warning w-full text-sm"
                    {...register("price")}
                  />
                  <span>USD</span>
                </label>
                <FormRowError error={errors.price} />
              </FormRow>

              {/* Image */}
              <FormRow label="Image" className="col-span-full">
                <div className="px-16 md:px-48">
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-info w-full "
                    {...register("image")}
                  />

                  {/* Preview image */}
                  {watch("imageUrl") && (
                    <img
                      className="mt-4 rounded-lg"
                      src={watch("imageUrl")}
                      alt={watch("title")}
                    />
                  )}
                </div>

                <FormRowError error={errors.image} />
              </FormRow>

              {/* Description */}
              <FormRow label="Description" className="col-span-full">
                <textarea
                  className="textarea textarea-warning resize-none h-52 text-sm"
                  placeholder="Descriptional"
                  {...register("description")}
                ></textarea>
              </FormRow>
              <FormRowError error={errors.description} />
            </div>

            {/* Submit button */}
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isLoading || !isDirty}
            >
              <div className="flex items-center gap-2">
                {isLoading && <Loader />}
                <span>{btnLabel}</span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductForm;
