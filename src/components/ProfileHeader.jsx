const ProfileHeader = ({ username }) => {
  return (
    <article className="bg-secondary flex items-center  justify-center gap-8 sm:gap-12 py-8">
      <div className="avatar placeholder">
        <div className="bg-base-100 text-neutral w-20 sm:w-24 rounded-full">
          <span className="text-3xl capitalize  font-bold">{username[0]}</span>
        </div>
      </div>
      <h2 className=" text-3xl sm:text-5xl font-semibold text-slate-700">
        {username}
      </h2>
    </article>
  );
};

export default ProfileHeader;
