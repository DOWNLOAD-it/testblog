<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogs=Blog::all();
        return response()->json($blogs, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData=$request->validate([
            'title'=>'required',
            'body'=>'required',
            'author'=>'required'
        ]);
        
        $blog=Blog::create($validatedData);

        return [
            "success"=>true
        ];
    }
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $blog=Blog::findOrFail($id);
        return response()->json($blog,200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData=$request->validate([
            'title'=>'required',
            'body'=>'required',
            'author'=>'required'
        ]);
        
        Blog::whereId($id)->update($validatedData);

        return [
            "success"=>true
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $blog=Blog::findOrFail($id)->delete();

        
        return [
            "success"=>true
        ];
    }
}
