class SentencesController < ApplicationController
  def new  
  end

  def create
    sentence_params = params["sentence"]
    sentence = Sentence.new sentence_params["english"], sentence_params["polish"]
    sentence.category = Category.where(id: sentence_params["category_id"]).first
    sentence.save!
  end

  def show
    @sentences = Sentence.all
  end

  def play
    cat = params['cat']
    if cat == nil
      @sentence = Sentence.first if cat == nil
    else
      cat = Category.where(name: cat).first
      @sentence = cat.sentences.first
    end
    @sentence = Sentence.new '','' unless @sentence
    if @sentence.category 
      @category_id = @sentence.category.id
      @total_category_sentences = @sentence.category.sentences.size
    else
      @category_id = ''
      @total_category_sentences = Sentence.count
    end

    @categories = Category.order(:name).all.map {|c| c.name }.to_a
  end

  def get_new
    ids_to_ignore= params["ids_to_ignore"]
    category_id = params["category_id"]
    sentence = Sentence.where("id NOT IN (?)", ids_to_ignore)
    sentence = sentence.where("category_id = (?)", category_id) if category_id
    respond_to do |format|
      format.json do
        render json: sentence.first
      end
    end
  end
end