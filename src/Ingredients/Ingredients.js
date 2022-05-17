import React, { useEffect, useCallback, useReducer, useMemo } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../hooks/http';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(
        (ingredient) => ingredient.id !== action.id
      );
    default:
      throw new Error('Should not get there!');
  }
};

// const httpReducer = (curHttpState, action) => {
//   switch (action.type) {
//     case 'SEND':
//       return { loading: true, error: null };
//     case 'RESPONSE':
//       return { ...curHttpState, loading: false };
//     case 'ERROR':
//       return { loading: false, error: action.errorMessage };
//     default:
//       throw new Error('Should not be reached!');
//   }
// };

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  // const [httpState, dispatchHttp] = useReducer(httpReducer, {
  //   isLoading: false,
  //   error: null,
  // });
  // const [userIngredients, setUserIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  // useEffect(() => {
  //   // console.log('RENDERING INGREDIENTS', userIngredients);
  // }, [userIngredients]);

  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifier,
    clear,
  } = useHttp();

  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === 'REMOVE_INGREDIENT') {
      dispatch({ type: 'DELETE', id: reqExtra });
    } else if (!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT') {
      dispatch({ type: 'ADD', ingredient: { id: data.name, ...reqExtra } });
    }
  }, [data, reqExtra, isLoading, error, reqIdentifier]);

  const filteredIngredientHandler = useCallback((filteredIngredients) => {
    // setUserIngredients(filteredIngredients);
    dispatch({ type: 'SET', ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = useCallback(
    (ingredient) => {
      sendRequest(
        'https://react-hooks-update-60525-default-rtdb.firebaseio.com/ingredients.json',
        'POST',
        JSON.stringify(ingredient),
        ingredient,
        'ADD_INGREDIENT'
      );
      // .then((response) => {
      //   // setIsLoading(false);
      //   dispatchHttp({ type: 'RESPONSE' });
      //   return response.json();
      // })
      // .then((responseData) => {
      //   // setUserIngredients((prevIngredients) => [
      //   //   ...prevIngredients,
      //   //   { id: responseData.name, ...ingredient },
      //   // ]);
      //   dispatch({
      //     type: 'ADD',
      //     ingredient: { id: responseData.name, ...ingredient },
      //   });
      // });
    },
    [sendRequest]
  );

  const removeIngredientHandler = useCallback(
    (ingredientId) => {
      // setIsLoading(true);
      sendRequest(
        `https://react-hooks-update-60525-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
        'DELETE',
        null,
        ingredientId,
        'REMOVE_INGREDIENT'
      );

      //     .then((response) => {
      //       dispatchHttp({ type: 'RESPONSE' });
      //       // setIsLoading(false);
      //       // setUserIngredients((prevIngredients) =>
      //       //   prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
      //       // );
      //       dispatch({
      //         type: 'DELETE',
      //         id: ingredientId,
      //       });
      //     })
      //     .catch((error) => {
      //       // setError('Something went wrong');
      //       dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
      //     });
      // }, []);
    },
    [sendRequest]
  );

  // const clearError = useCallback(() => {
  // setError(null);
  // setIsLoading(false);
  // dispatchHttp({ type: 'CLEAR' });

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {/* {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )} */}
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        // loading={httpState.loading}
        loading={isLoading}
      />
      <section>
        <Search onLoadIngredients={filteredIngredientHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default Ingredients;
