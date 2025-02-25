import React, { useReducer } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import uuid from 'react-native-uuid';

const initialState = {
  tasks: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, { id: action.payload.id, text: action.payload.text }],
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [task, setTask] = React.useState('');

  const handleAddTask = () => {
    if (task.trim() !== '') {
      dispatch({ type: 'ADD_TASK', payload: { id: uuid.v4(), text: task } });
      setTask('');
    }
  };

  const handleRemoveTask = (id) => {
    dispatch({ type: 'REMOVE_TASK', payload: id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add new..."
          value={task}
          onChangeText={setTask}
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={handleAddTask} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={state.tasks}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRemoveTask(item.id)}>
            <Text style={styles.task}>{item.text}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    borderColor: 'transparent',
    borderWidth: 0,
    fontSize: 20,
  },
  task: {
    padding: 16,
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
    fontSize: 20,
  },
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  saveButtonText: {
    color: '#00BFFF',
    fontSize: 20,
  },
});

export default App;
