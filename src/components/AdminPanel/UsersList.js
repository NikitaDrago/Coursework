const UsersList = ({users, onOption, profile, isError}) =>
  <select className={(isError ? 'select_negative ' : '') + "select AdminPanel-container-select"} onChange={onOption} value={profile?.id ?? -1}>
    <option value="-1">Не выбрано</option>
    {
      users.map(item => <option key={Math.random()} value={item.id}>{item.login}</option>)
    }
  </select>;

export default UsersList;
