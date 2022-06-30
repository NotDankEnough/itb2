// Copyright (C) 2022 ilotterytea
// 
// This file is part of iLotteryteaLive.
// 
// iLotteryteaLive is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// iLotteryteaLive is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with iLotteryteaLive.  If not, see <http://www.gnu.org/licenses/>.

import { ApiClient, HelixUser } from "twitch";
import { StaticAuthProvider } from "twitch-auth";

async function TwitchAPI(
    client_id: string,
    access_token: string
) {
    const Auth = new StaticAuthProvider(client_id, access_token);
    const API = new ApiClient({authProvider: Auth});

    return API.helix;
}

export default TwitchAPI;