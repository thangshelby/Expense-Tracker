import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';

export class ToggleTheme {
  static readonly type = '[Theme] Toggle';
}

export interface ThemeStateModel {
  darkMode: boolean;
}

@State<ThemeStateModel>({
  name: 'theme',
  defaults: {
    darkMode: false,
  },
})
@Injectable({
  providedIn: 'root',
})
export class ThemeState {
  @Selector()
  static isDarkMode(state: ThemeStateModel): boolean {
    return state.darkMode;
  }

  @Action(ToggleTheme)
  toggleTheme(ctx: StateContext<ThemeStateModel>) {
    const state = ctx.getState();
    const newDarkMode = !state.darkMode;
    localStorage.setItem('theme', String(newDarkMode));

    const body = document.body;
    if (newDarkMode) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }

    ctx.setState({
      ...state,
      darkMode: newDarkMode,
    });
  }
}
