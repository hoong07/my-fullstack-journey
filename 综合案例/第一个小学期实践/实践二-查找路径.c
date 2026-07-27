#include<stdio.h>
#include<stdlib.h>

#define NAMESIZE 20

typedef struct BROTHERNODE //兄弟节点
{
    char node;
    struct BROTHERNODE* next;  
}BROTHERNODE;
typedef BROTHERNODE* BROTHER;

// 双亲结点
typedef struct PARENTNODE
{
    char node;
    BROTHER child;
}PARENTNODE;
typedef PARENTNODE* PARENT;

//树分支节点
typedef struct TREENODE
{
    PARENT node;//双亲节点
    struct TREENODE* next;//垂直连接构造树结构
}TREENODE;
typedef TREENODE* TREE;

// 栈结构 用于查找
typedef struct STACKNODE
{
    char name;
    struct STACKNODE* next;
} STACKNODE;
typedef STACKNODE* STACK;


BROTHER appendBrotherNode(BROTHER br, char node)//兄弟节点之间的连接
{
    BROTHER p1 = (BROTHER)malloc(sizeof(BROTHERNODE));
    p1->node = node;
    p1->next = NULL;

    if (!br)
    {
        return p1;
    }

    BROTHER p2 = br;
    while (p2->next)
    {
        p2 = p2->next;
    }
    p2->next = p1;
    return br;
}

//双亲节点与兄弟节点构建子树
TREE CreatTree(char parnode, BROTHER br)
{
    TREE root = (TREE)malloc(sizeof(TREENODE));
    root->node = (PARENT)malloc(sizeof(PARENTNODE));
    root->node->node = parnode;//parentNode.node = parnode
    root->node->child = br;//parentNode.chile = br
    root->next = NULL;
    return root;
}

//连接头树节点
TREE addTree(TREE tree, TREE newtree)//已经有的树列节点、新建的树节点
{
    TREE root = tree;
    if (!tree)//树空 没有树
    {
        tree = newtree;
    }
    else {
        while (root->next)
        {
            root = root->next;
        }
        root->next = newtree;
    }
    return tree;
}

//清除兄弟节点
BROTHER clearBrother(BROTHER br)
{
    BROTHER ptr = br;
    while (br)//头删
    {
        ptr = br;
        br = br->next;
        free(ptr);
    }
    return br;
}


//清除树
TREE clearTree(TREE root)
{
    TREE ptr;
    while (root)
    {
        ptr = root;
        root = root->next;
        if (ptr->node)//该树节点有连接
        {
            clearBrother(ptr->node->child);
            free(ptr->node);
        }
        free(ptr);
    }
    return NULL;
}

//兄弟节点填数据+构成链
BROTHER creatBrotherList(BROTHER rbrother, char* input)
{
    for (int i = 0; input[i] != '\0'; i++)
    {
        if (input[i] != '/')//输入数据用'/'分隔
        {
            rbrother = appendBrotherNode(rbrother, input[i]);
        }
    }
    return rbrother;
}

//入栈
STACK push(STACK stack, const char name)
{
    STACK newNode = (STACK)malloc(sizeof(STACKNODE));
    newNode->name = name;
    newNode->next = stack;
    return newNode;
}

//出栈
STACK pop(STACK stack, char* name)
{
    if (stack == NULL)
        return NULL;
    STACK temp = stack;
    *name = temp->name;
    stack = stack->next;
    free(temp);
    return stack;
}

//栈空判断
int isEmpty(STACK stack)
{
    return stack == NULL;
}

void printPath(STACK path)//输出路径
{
    if (!path) return;
    printf("%c", path->name);
    path = path->next;
    while (path)
    {
        printf("->%c", path->name);
        path = path->next;
    }
    printf("\n");
}
//查找节点父节点 -> 回溯  返回父节点的节点名
char findParent(TREE tree,char node)
{
    TREE cur = tree;
    while(cur)
    {
        BROTHER bro = cur->node->child;
        while(bro)
        {
            if(bro->node == node)
            {
                return cur ->node->node;
            }
        bro = bro-> next;
        }
        cur = cur->next;
    }
    return '\0';
}

//搜索
void mySearchInTree(TREE tree, char target)
{
    if (tree == NULL)
        {
            printf("not found\n");
            return ;
        }
    STACK stack = NULL;
    //根节点入栈 -> parent.node
    stack = push(stack, tree->node->node);
    int found = 0;//通过bool变量found，判断是否找到
    char currentName;

    while (!isEmpty(stack))//栈空
    {
        stack = pop(stack, &currentName);//出栈，标记当前元素

        if (currentName == target)//找到
        {
            found = 1;
            // 清空栈
            while (!isEmpty(stack))
                stack = pop(stack, &currentName);
            break;
        }

        TREE cur = tree;
        while (cur != NULL)//树中找当前节点 把孩子入栈
        {
            if (cur->node->node == currentName)
            {
                BROTHER child = cur->node->child;
                while (child != NULL)
                {
                    stack = push(stack, child->node);
                    child = child->next;
                }
                break;
            }
            cur = cur->next;
        }
    }

    if(!found)//没找到
        {
            printf("not found\n");
            return ;
        }

    //找到了、回溯路径
    STACK path = NULL;
    char cur = target;
    while(cur != '\0')
    {
        path = push(path,cur);
        cur = findParent(tree,cur);
    }
    printPath(path);
}


int main()
{
    int n;
    scanf("%d", &n);

    //  建树
    TREE tree = NULL;
    for (int i = 0; i < n; i++)
    {
        char parentName;
        char childStr[NAMESIZE];

        scanf(" %c", &parentName);   // 跳过换行
        scanf("%s", childStr);        // 读孩子 ->"B/C"

        BROTHER br = NULL;
        br = creatBrotherList(br, childStr);

        TREE newtree = CreatTree(parentName, br);
        tree = addTree(tree, newtree);
    }
    
    //查找、输出路径
    char target;
    scanf(" %c", &target);

    mySearchInTree(tree,target);

    clearTree(tree);
    return 0;
}