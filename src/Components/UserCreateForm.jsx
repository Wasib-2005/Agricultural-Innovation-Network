
const UserCreateForm = () => {
  return (
    <div>
      {/* Form Fields */}
      <AnimatePresence mode="wait">
        <>
          <motion.input
            key="username"
            type="text"
            name="username"
            placeholder="Username"
            className="input w-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-lime-400 text-gray-700 px-3 py-2 rounded-lg outline-none shadow-sm"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
          <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
            <p className="text-gray-400 w-full sm:w-20 pl-1 sm:pl-2">I am a</p>
            <select
              defaultValue="se"
              className="select w-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-lime-400 text-gray-500 px-3 py-2 rounded-lg outline-none shadow-sm"
            >
              <option value="se" disabled>
                Select One
              </option>
              <option value="farmer">Farmer</option>
              <option>Officer</option>
              <option>Consumer</option>
            </select>
          </motion.div>
        </>
      </AnimatePresence>
    </div>
  );
};

export default UserCreateForm;
