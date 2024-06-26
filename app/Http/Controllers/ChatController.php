<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\MessageSent;
use App\Events\GreetingSent; 
use App\Models\User;
class ChatController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function showChat()
    {
        return view('chat.show');
    }

    public function messageReceived(Request $request){
        
        $rules = [
            'message' => 'required'
        ];

        $request->validate($rules);

        broadcast(new MessageSent($request->user(), $request->message));

        return response()->json('Message broadcast');
    }

    
    public function greetReceived(Request $request, User $user){ 

        // Primer parametro a quien se le va enviar la notificacion
        // Segundo parametro es quien recibe ese parametro
        broadcast(new GreetingSent($user, "{$request->user->name} greeted you"));
        broadcast(new GreetingSent($request->user(), "You greeted {$user->name}"));

        return "Greeting {$user->name} from {$request->user()->name}";
    }

}
