import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerData } from "../types/types";
import { fetchPlayersApi } from "../api/apiAction";

type PlayersState = {
    players: PlayerData[],
    favPlayers: PlayerData[],
    error: string | null,
    loading: boolean,
    next_cursor: number, 
    last_search: string | undefined
}

const initialState: PlayersState = {
    players: [],
    favPlayers: [],
    error: null,
    loading: false,
    next_cursor: 0,
    last_search: undefined
}

export const fetchPlayers = createAsyncThunk(
    'players/fetchPlayers',
    async ({ path, search, cursor }: { path: string; search?: string; cursor?: number }, { rejectWithValue }) => {
        try {
            const data = await fetchPlayersApi(path, search, cursor);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        addToFavorite(state, action: PayloadAction<PlayerData>) {
            state.favPlayers.push(action.payload);
        }, 
        removeFromFavorite(state, action: PayloadAction<PlayerData>) {
            state.favPlayers = state.favPlayers.filter(player => player.id !== action.payload.id);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlayers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPlayers.fulfilled, (state, action: PayloadAction<{players:PlayerData[],next_cursor:number, last_search: string| undefined}>) => {
                state.loading = false;
                state.players = state.last_search === action.payload.last_search
                ? [...state.players, ...action.payload.players]
                : action.payload.players;
                state.next_cursor = action.payload.next_cursor;
                state.last_search = action.payload.last_search;
            })
            .addCase(fetchPlayers.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Failed to fetch players';
            });
    },
});

export const { addToFavorite, removeFromFavorite } = playersSlice.actions;
export default playersSlice.reducer;