const UsersList = ({users, onOption, profile}) =>
  <select className="select AdminPanel-container-select" onChange={onOption} value={profile?.id ?? -1}>
    <option value="-1">Не выбрано</option>
    {
      users.map(item => <option key={Math.random()} value={item.id}>{item.login}</option>)
    }
  </select>;

export default UsersList;
