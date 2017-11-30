

const ApolloRoles = {
  userIsInRole: (role, user) => {
    //console.log(role, user);
      if (!user) { return false }
      if (!role) { return false }
      if (!user.roles) {return false }
      if (user.roles.includes(role)) { return true }
      return false
  }
}

export { ApolloRoles };