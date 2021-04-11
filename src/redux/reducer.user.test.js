import { updateExistingUserWord } from "./actions.user";

test("thunk should be called", () => {
  const thunk = updateExistingUserWord({ wordId: 1343142, word: "test" });
  const dispatchMock = jest.fn();

  thunk(dispatchMock);

  expect(dispatchMock).toBeCalled();
});
