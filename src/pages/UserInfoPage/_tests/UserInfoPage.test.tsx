import '@testing-library/jest-dom';
import {USERS} from "../../../data";
import {renderWithRouter} from "../../../tests/helpers/renderWithRouter";

const renderComponent = (userId: number) => {
    return renderWithRouter(`/users/${userId}`);
}

describe('Тест компонента UserInfoPage', () => {
   test('Тест, проверяющий текст по умолчанию, если нет пользователя', () => {
        const { getByTestId } = renderComponent(999);
        expect(getByTestId('EmptyUser'))?.toHaveTextContent('Пользователя с таким ID нет');
   });
   test('Тест, проверяющий данные о пользователе, если он существует (email, имя, ссылка на плейлист)', () => {
       function runTestWithUserId (userId: number) {
           const { getByTestId } = renderComponent(userId);
           if (USERS[userId]) {
               expect(getByTestId('Name')).toHaveTextContent(USERS[userId].fullName);
               expect(getByTestId('Email')).toHaveTextContent(USERS[userId].email);
               if (USERS[userId].playlist) {
                   expect(getByTestId('Link')).toHaveAttribute('href', `/playlists/${userId}`);
               }
           }
       }
       runTestWithUserId(1);
   });
});
