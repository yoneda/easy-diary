const data = {
  notes: [
    {
      id: "esr11Pg6",
      body: "ratione",
      createdAt: "2021-03-23T21:07:59"
    },
    {
      id: "q69VppzW",
      body: "enim",
      createdAt: "2021-03-23T21:07:59"
    },
    {
      id: "KcKuERJh",
      body: "neque",
      createdAt: "2021-03-23T21:07:59"
    }
  ],
  user: {
    uiStyle: "dayone",
    fontSize: "midium",
    dark: false
  }
};

const dbClient = {
  getAll: () => data,
  addNote: function ({ note }) {
    data.notes = [note, ...data.notes];
    return data.notes;
  },
  editNote: function ({ id, body, tags }) {
    data.notes = data.notes.map(note =>
      note.id === id ? { ...note, id, body, tags } : note
    );
    return data.notes;
  },
  removeNote: function ({ ids }) {
    data.notes = data.notes.filter(note => !ids.some(id => id === note.id));
    return data.notes;
  },
  updateUser: function (payload) {
    data.user = { ...data.user, ...payload };
    return data.user;
  }
};

export default dbClient;