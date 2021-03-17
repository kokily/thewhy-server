export const typeDefs = ["type LoginResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  Login(password: String!): LoginResponse!\n  Logout: LogoutResponse!\n  Register(password: String!): RegisterResponse!\n  SendContact(name: String!, email: String!, subject: String!, body: String!): SendContactResponse!\n  AddNotice(title: String!, body: String!): AddNoticeResponse!\n  RemoveNotice(id: ID!): RemoveNoticeResponse!\n  UpdateNotice(id: ID!, title: String, body: String): UpdateNoticeResponse!\n  AddQuestion(name: String!, password: String!, phone: String, email: String, title: String!, body: String!): AddQuestionResponse!\n  RemoveQuestion(id: ID!, password: String!): RemoveQuestionResponse!\n  UpdateQuestion(id: ID!, password: String!, name: String, phone: String, email: String, title: String, body: String): UpdateQuestionResponse!\n  AddReply(body: String!, questionId: ID!): AddReplyResponse!\n  DeleteQuestion(id: ID!): DeleteQuestionResponse!\n  RemoveReply(id: ID!): RemoveReplyResponse!\n  UpdateReply(id: ID!, body: String): UpdateReplyResponse!\n  AddStory(title: String!, body: String!, thumbnail: String, tags: [String]): AddStoryResponse!\n  RemoveStory(id: ID!): RemoveStoryResponse!\n  UpdateStory(id: ID!, title: String, body: String, thumbnail: String, tags: [String]): UpdateStoryResponse!\n}\n\ntype LogoutResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Me {\n  adminId: String\n}\n\ntype MeResponse {\n  ok: Boolean!\n  error: String\n  me: Me\n}\n\ntype Query {\n  Me: MeResponse!\n  ListNotice(page: Int): ListNoticeResponse!\n  ReadNotice(id: ID!): ReadNoticeResponse!\n  ListQuestions(page: Int): ListQuestionsResponse!\n  ReadQuestion(id: ID!): ReadQuestionResponse!\n  ListStories(title: String, tag: String, cursor: ID): ListStoriesResponse!\n  ReadStory(id: ID!): ReadStoryResponse!\n}\n\ntype RegisterResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype SendContactResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype AddNoticeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ListNoticeResponse {\n  ok: Boolean!\n  error: String\n  notice: [Notice]\n  lastPage: Int!\n}\n\ntype ReadNoticeResponse {\n  ok: Boolean!\n  error: String\n  notice: Notice\n}\n\ntype RemoveNoticeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateNoticeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype AddQuestionResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ListQuestionsResponse {\n  ok: Boolean!\n  error: String\n  questions: [Question]\n  lastPage: Int!\n}\n\ntype ReadQuestionResponse {\n  ok: Boolean!\n  error: String\n  question: Question\n}\n\ntype RemoveQuestionResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateQuestionResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype AddReplyResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype DeleteQuestionResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype RemoveReplyResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateReplyResponse {\n  ok: Boolean!\n  error: String\n}\n\nscalar Date\n\ntype Admin {\n  id: ID!\n  username: String!\n  password: String!\n  created_at: Date!\n}\n\ntype Notice {\n  id: ID!\n  num: Int!\n  title: String!\n  body: String!\n  created_at: Date!\n  updated_at: Date\n}\n\ntype Question {\n  id: ID!\n  name: String!\n  password: String!\n  phone: String\n  email: String\n  isReply: Boolean!\n  title: String!\n  body: String!\n  replyId: String\n  reply: Reply\n  created_at: Date!\n  updated_at: Date\n}\n\ntype Reply {\n  id: ID!\n  body: String!\n  questionId: String\n  question: Question\n  created_at: Date!\n  updated_at: Date\n}\n\ntype Story {\n  id: ID!\n  title: String!\n  body: String!\n  thumbnail: String\n  tags: [String]\n  created_at: Date!\n  updated_at: Date\n}\n\ntype AddStoryResponse {\n  ok: Boolean!\n  error: String\n  story: Story\n}\n\ntype ListStoriesResponse {\n  ok: Boolean!\n  error: String\n  stories: [Story]\n}\n\ntype ReadStoryResponse {\n  ok: Boolean!\n  error: String\n  story: Story\n}\n\ntype RemoveStoryResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateStoryResponse {\n  ok: Boolean!\n  error: String\n}\n"];
/* tslint:disable */

export interface Query {
  Me: MeResponse;
  ListNotice: ListNoticeResponse;
  ReadNotice: ReadNoticeResponse;
  ListQuestions: ListQuestionsResponse;
  ReadQuestion: ReadQuestionResponse;
  ListStories: ListStoriesResponse;
  ReadStory: ReadStoryResponse;
}

export interface ListNoticeQueryArgs {
  page: number | null;
}

export interface ReadNoticeQueryArgs {
  id: string;
}

export interface ListQuestionsQueryArgs {
  page: number | null;
}

export interface ReadQuestionQueryArgs {
  id: string;
}

export interface ListStoriesQueryArgs {
  title: string | null;
  tag: string | null;
  cursor: string | null;
}

export interface ReadStoryQueryArgs {
  id: string;
}

export interface MeResponse {
  ok: boolean;
  error: string | null;
  me: Me | null;
}

export interface Me {
  adminId: string | null;
}

export interface ListNoticeResponse {
  ok: boolean;
  error: string | null;
  notice: Array<Notice> | null;
  lastPage: number;
}

export interface Notice {
  id: string;
  num: number;
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date | null;
}

export type Date = any;

export interface ReadNoticeResponse {
  ok: boolean;
  error: string | null;
  notice: Notice | null;
}

export interface ListQuestionsResponse {
  ok: boolean;
  error: string | null;
  questions: Array<Question> | null;
  lastPage: number;
}

export interface Question {
  id: string;
  name: string;
  password: string;
  phone: string | null;
  email: string | null;
  isReply: boolean;
  title: string;
  body: string;
  replyId: string | null;
  reply: Reply | null;
  created_at: Date;
  updated_at: Date | null;
}

export interface Reply {
  id: string;
  body: string;
  questionId: string | null;
  question: Question | null;
  created_at: Date;
  updated_at: Date | null;
}

export interface ReadQuestionResponse {
  ok: boolean;
  error: string | null;
  question: Question | null;
}

export interface ListStoriesResponse {
  ok: boolean;
  error: string | null;
  stories: Array<Story> | null;
}

export interface Story {
  id: string;
  title: string;
  body: string;
  thumbnail: string | null;
  tags: Array<string> | null;
  created_at: Date;
  updated_at: Date | null;
}

export interface ReadStoryResponse {
  ok: boolean;
  error: string | null;
  story: Story | null;
}

export interface Mutation {
  Login: LoginResponse;
  Logout: LogoutResponse;
  Register: RegisterResponse;
  SendContact: SendContactResponse;
  AddNotice: AddNoticeResponse;
  RemoveNotice: RemoveNoticeResponse;
  UpdateNotice: UpdateNoticeResponse;
  AddQuestion: AddQuestionResponse;
  RemoveQuestion: RemoveQuestionResponse;
  UpdateQuestion: UpdateQuestionResponse;
  AddReply: AddReplyResponse;
  DeleteQuestion: DeleteQuestionResponse;
  RemoveReply: RemoveReplyResponse;
  UpdateReply: UpdateReplyResponse;
  AddStory: AddStoryResponse;
  RemoveStory: RemoveStoryResponse;
  UpdateStory: UpdateStoryResponse;
}

export interface LoginMutationArgs {
  password: string;
}

export interface RegisterMutationArgs {
  password: string;
}

export interface SendContactMutationArgs {
  name: string;
  email: string;
  subject: string;
  body: string;
}

export interface AddNoticeMutationArgs {
  title: string;
  body: string;
}

export interface RemoveNoticeMutationArgs {
  id: string;
}

export interface UpdateNoticeMutationArgs {
  id: string;
  title: string | null;
  body: string | null;
}

export interface AddQuestionMutationArgs {
  name: string;
  password: string;
  phone: string | null;
  email: string | null;
  title: string;
  body: string;
}

export interface RemoveQuestionMutationArgs {
  id: string;
  password: string;
}

export interface UpdateQuestionMutationArgs {
  id: string;
  password: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  title: string | null;
  body: string | null;
}

export interface AddReplyMutationArgs {
  body: string;
  questionId: string;
}

export interface DeleteQuestionMutationArgs {
  id: string;
}

export interface RemoveReplyMutationArgs {
  id: string;
}

export interface UpdateReplyMutationArgs {
  id: string;
  body: string | null;
}

export interface AddStoryMutationArgs {
  title: string;
  body: string;
  thumbnail: string | null;
  tags: Array<string> | null;
}

export interface RemoveStoryMutationArgs {
  id: string;
}

export interface UpdateStoryMutationArgs {
  id: string;
  title: string | null;
  body: string | null;
  thumbnail: string | null;
  tags: Array<string> | null;
}

export interface LoginResponse {
  ok: boolean;
  error: string | null;
}

export interface LogoutResponse {
  ok: boolean;
  error: string | null;
}

export interface RegisterResponse {
  ok: boolean;
  error: string | null;
}

export interface SendContactResponse {
  ok: boolean;
  error: string | null;
}

export interface AddNoticeResponse {
  ok: boolean;
  error: string | null;
}

export interface RemoveNoticeResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateNoticeResponse {
  ok: boolean;
  error: string | null;
}

export interface AddQuestionResponse {
  ok: boolean;
  error: string | null;
}

export interface RemoveQuestionResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateQuestionResponse {
  ok: boolean;
  error: string | null;
}

export interface AddReplyResponse {
  ok: boolean;
  error: string | null;
}

export interface DeleteQuestionResponse {
  ok: boolean;
  error: string | null;
}

export interface RemoveReplyResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateReplyResponse {
  ok: boolean;
  error: string | null;
}

export interface AddStoryResponse {
  ok: boolean;
  error: string | null;
  story: Story | null;
}

export interface RemoveStoryResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateStoryResponse {
  ok: boolean;
  error: string | null;
}

export interface Admin {
  id: string;
  username: string;
  password: string;
  created_at: Date;
}
